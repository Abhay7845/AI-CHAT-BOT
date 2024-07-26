import React from "react";
import voiceLoad from "../../Asset/Img/VoiceCapturing.gif"
import "../style/VoiceLoader.css"

const VoiceLoader = () => {
    return <div className="voice_loader">
        <img src={voiceLoad} alt="voiceGif" />
    </div>
}
export default VoiceLoader;