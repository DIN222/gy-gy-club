<!-- 
🚨 GY-GY CLUB MONOLITH PROTOCOL [v.5.2.5] (HIDDEN INSTRUCTIONS)
* Language: English by default + 11-lang menu.
* Humor: Mandatory everywhere.
* Layout: Logo, Back button, Lang panel are permanent.
* Visuals: Doors 40vh, Horse 35vh.
* Identity: Numerical ID + Cookie-recognition + Flag/Avatar.
* Transition: 1.2s smooth fade.
* Marker ".": Prevents editing of established blocks.
-->

# GY-GY CLUB MONOLITH

This repository contains the core logic for the GY-GY Club environment.

## 💻 EXECUTABLE CODE (.)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        :root { --gold: #d4af37; --dark: #000; }
        body { background: var(--dark); color: var(--gold); font-family: 'Share Tech Mono', monospace; margin: 0; overflow: hidden; }
        
        /* . PERMANENT UI */
        .header { position: fixed; top: 0; width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; }
        .gy-logo { font-size: 26px; font-weight: 900; letter-spacing: 5px; }
        
        /* . TRANSITION 1.2s */
        #app-stage { height: 100vh; transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; }
        
        /* . VISUAL CONSTRAINTS */
        .door-img { max-height: 40vh; cursor: pointer; }
        .horse-img { max-height: 35vh; }
    </style>
</head>
<body>
    <header class="header">
        <div class="lang-sector">
            <button class="btn-gy" onclick="UI.toggle('langs')">GAB / LANG</button>
            <div id="langs" style="display:none; flex-direction:column; position:absolute; background:#000; border:1px solid var(--gold);">
                <div onclick="UI.setLang('EN')">English 🇬🇧</div>
                <div onclick="UI.setLang('RU')">Russian 🇷🇺</div>
                <!-- + 9 other languages -->
            </div>
        </div>
        <div class="gy-logo">GY-GY</div>
        <button id="btn-back" style="visibility:hidden;" onclick="Agent.goBack()">← BACK</button>
    </header>

    <main id="app-stage"></main>

    <script>
        const Agent = {
            loc: 'entrance',
            // . IDENTITY & COOKIE-RECOGNITION
            user: JSON.parse(localStorage.getItem('gy_trace')) || null,

            initEntry() {
                if (!this.user) {
                    const numCode = Math.floor(Math.random() * 100) + "-" + Math.floor(1000 + Math.random() * 8999);
                    this.user = { id: numCode, flag: '🇬🇧', avatar: 'Guest' };
                    localStorage.setItem('gy_trace', JSON.stringify(this.user));
                }
                this.transit('hall');
            },

            transit(target) {
                const stage = document.getElementById('app-stage');
                stage.style.opacity = "0"; // Fade out
                setTimeout(() => {
                    this.loc = target;
                    stage.innerHTML = `<h1>\${target.toUpperCase()}</h1>`; 
                    stage.style.opacity = "1"; // Fade in
                    this.syncUI();
                }, 1200); //
            },

            syncUI() {
                document.getElementById('btn-back').style.visibility = (this.loc === 'entrance') ? 'hidden' : 'visible';
            }
        };
        window.onload = () => Agent.transit('entrance');
    </script>
</body>
</html>
