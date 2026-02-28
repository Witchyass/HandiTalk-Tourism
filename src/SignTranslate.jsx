import React, { useEffect, useRef, useState } from 'react';

// MediaPipe is now loaded via global script tags in index.html 
// to avoid bundling conflicts. We access them via the window object.
const { Hands, Camera, drawConnectors, drawLandmarks } = window;
const HAND_CONNECTIONS = window.HAND_CONNECTIONS;

const API_URL = "http://localhost:8000/predict";

export default function SignTranslate({ setPage }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [prediction, setPrediction] = useState("");
    const [score, setScore] = useState(0);
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDetectorLoading, setIsDetectorLoading] = useState(true);

    const sequenceBuffer = useRef([]);
    const lastProcessingTime = useRef(0);
    const lastHandSeenTime = useRef(Date.now());
    const detectorRef = useRef(null);

    useEffect(() => {
        let isInstanceValid = true;
        let camera = null;

        const setupAI = async () => {
            try {
                if (!videoRef.current) return;

                // Use the ref to persist the instance and avoid re-initialization crashes
                if (!detectorRef.current) {
                    detectorRef.current = new Hands({
                        locateFile: (file) => {
                            // Load WASM files from local public directory to match the JS version
                            return `/mediapipe/hands/${file}`;
                        },
                    });

                    detectorRef.current.setOptions({
                        maxNumHands: 2,
                        modelComplexity: 0, // 0 = Lite (faster), 1 = Full
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5,
                    });

                    detectorRef.current.onResults((results) => {
                        if (!isInstanceValid || !canvasRef.current) return;
                        setIsDetectorLoading(false);

                        const hasHands = results.multiHandLandmarks && results.multiHandLandmarks.length > 0;
                        if (hasHands) {
                            lastHandSeenTime.current = Date.now();
                        } else {
                            if (Date.now() - lastHandSeenTime.current > 1500) {
                                setPrediction("");
                                setScore(0);
                            }
                        }

                        const canvasCtx = canvasRef.current.getContext('2d');
                        if (!canvasCtx) return;

                        canvasCtx.save();
                        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

                        let frameFeatures = new Array(126).fill(0);
                        if (hasHands) {
                            for (const landmarks of results.multiHandLandmarks) {
                                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
                                drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
                            }
                            if (results.multiHandLandmarks[0]) {
                                results.multiHandLandmarks[0].forEach((lm, idx) => {
                                    frameFeatures[idx * 3] = lm.x;
                                    frameFeatures[idx * 3 + 1] = lm.y;
                                    frameFeatures[idx * 3 + 2] = lm.z;
                                });
                            }
                            if (results.multiHandLandmarks[1]) {
                                results.multiHandLandmarks[1].forEach((lm, idx) => {
                                    frameFeatures[63 + idx * 3] = lm.x;
                                    frameFeatures[63 + idx * 3 + 1] = lm.y;
                                    frameFeatures[63 + idx * 3 + 2] = lm.z;
                                });
                            }
                        }
                        canvasCtx.restore();

                        sequenceBuffer.current.push(frameFeatures);
                        if (sequenceBuffer.current.length > 16) sequenceBuffer.current.shift();

                        const now = Date.now();
                        if (hasHands && sequenceBuffer.current.length === 16 && now - lastProcessingTime.current > 300) {
                            lastProcessingTime.current = now;
                            sendToInference(sequenceBuffer.current);
                        }
                    });
                }

                camera = new Camera(videoRef.current, {
                    onFrame: async () => {
                        if (videoRef.current && detectorRef.current) {
                            await detectorRef.current.send({ image: videoRef.current });
                        }
                    },
                    width: 640,
                    height: 480,
                });
                await camera.start();
            } catch (err) {
                console.error("AI Setup Error:", err);
                if (isInstanceValid) {
                    setError("AI engine failed to start: " + err.message);
                    setIsDetectorLoading(false);
                }
            }
        };

        setupAI();

        return () => {
            isInstanceValid = false;
            if (camera) camera.stop();
            // Note: We don't close detectorRef.current here to avoid Emscripten module aborts on re-init
        };
    }, []);

    const sendToInference = async (sequence) => {
        try {
            setIsApiLoading(true);
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sequence }),
            });

            if (response.ok) {
                const data = await response.json();
                // Confidence filter: only update if > 0.65
                if (data.score > 0.65) {
                    setPrediction(data.label || "Unknown");
                    setScore(data.score || 0);
                }
                setError(null);
            } else {
                setError("Inference API error");
            }
        } catch (err) {
            setError("Inference API not reachable");
        } finally {
            setIsApiLoading(false);
        }
    };

    return (
        <div style={{ padding: '100px 48px', background: '#0E0E18', minHeight: '100vh', color: 'white' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <button onClick={() => setPage('home')} style={{
                    background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', padding: '10px 20px', borderRadius: 50,
                    cursor: 'pointer', marginBottom: 32, fontFamily: 'DM Mono'
                }}>
                    ← BACK TO EXPLORE
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 48 }}>
                    {/* Camera View */}
                    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', background: '#000', minHeight: 480 }}>
                        <video ref={videoRef} playsInline muted style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', width: 1, height: 1 }} />
                        <canvas ref={canvasRef} width="640" height="480" style={{ width: '100%', height: 'auto', display: 'block' }} />

                        {isDetectorLoading && !error && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', zIndex: 10 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="anim-pulse" style={{ width: 40, height: 40, border: '3px solid var(--pink)', borderRadius: '50%', margin: '0 auto 16px', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                                    <span style={{ fontFamily: 'DM Mono', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>INITIALIZING AI ENGINE...</span>
                                </div>
                            </div>
                        )}

                        <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 16px', background: 'rgba(232,24,90,0.8)', borderRadius: 50, fontSize: 12, fontFamily: 'DM Mono' }}>
                            LIVE SIGN FEED
                        </div>
                    </div>

                    {/* Results Analysis */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="glass" style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.03)' }}>
                            <span style={{ color: 'var(--pink)', fontFamily: 'DM Mono', fontSize: 12, letterSpacing: 2 }}>AI DETECTOR</span>
                            <h2 style={{ fontFamily: 'Playfair Display', fontSize: 32, margin: '16px 0 32px' }}>Real-time Translation</h2>

                            <div style={{ marginBottom: 40 }}>
                                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>PREDICTED SIGN</span>
                                <div style={{
                                    fontSize: 64, fontWeight: 900, color: 'white',
                                    fontFamily: 'Playfair Display', fontStyle: 'italic',
                                    minHeight: 80, textTransform: 'capitalize'
                                }}>
                                    {prediction || "---"}
                                </div>
                                <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.1)', marginTop: 8, borderRadius: 2 }}>
                                    <div style={{ height: '100%', width: `${score * 100}%`, background: 'var(--pink)', transition: 'width 0.3s' }} />
                                </div>
                                <span style={{ fontSize: 11, fontFamily: 'DM Mono', color: 'rgba(255,255,255,0.4)', marginTop: 4, display: 'block' }}>
                                    CONFIDENCE: {(score * 100).toFixed(1)}%
                                </span>
                            </div>

                            {error && (
                                <div style={{
                                    padding: 24, background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20,
                                    color: '#FCA5A5', fontSize: 13, marginBottom: 24,
                                    lineHeight: 1.6
                                }}>
                                    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>⚠️ Setup Error</div>
                                    {error}
                                    <div style={{ marginTop: 16, borderTop: '1px solid rgba(239,68,68,0.2)', paddingTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
                                        Tip: Check camera permissions and ensure the inference API is running at localhost:8000.
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 16 }}>
                                <div className={isApiLoading ? "anim-pulse" : ""} style={{ width: 8, height: 8, borderRadius: '50%', background: isApiLoading ? 'var(--pink)' : '#3ECFB2' }} />
                                <span style={{ fontSize: 12, fontFamily: 'DM Mono', color: 'rgba(255,255,255,0.6)' }}>
                                    {isApiLoading ? "PROCESSING ENGINE..." : "STREAMS ACTIVE"}
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, rgba(232,24,90,0.05), transparent)' }}>
                            <h4 style={{ fontSize: 14, marginBottom: 16 }}>How to use</h4>
                            <ul style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', paddingLeft: 16, lineHeight: 1.6 }}>
                                <li style={{ marginBottom: 8 }}>Position both hands clearly in front of your camera.</li>
                                <li style={{ marginBottom: 8 }}>Perform the sign slowly within the visual markers.</li>
                                <li>The AI will detect the best 16 frames to interpret your message.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
