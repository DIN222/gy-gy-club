const Scenes = {
    // 1. Вход
    entrance: `
        <div class="scene">
            <img src="door.png" class="door-img" onclick="Agent.transit('welcome')">
            <p class="slogan">The door looks at you suspiciously... Open it! гы-гы!</p>
        </div>`,
    
    // 2. Зона приветствия
    welcome: `
        <div class="scene">
            <h1 class="slogan">WELCOME TO THE VOID</h1>
            <p>Wait a second while we check if you're a robot or a stallion...</p>
            <button class="btn-gy" onclick="Agent.initIdentity()">IDENTIFY ME</button>
        </div>`,

    // 3. Генерация ID
    generating: `
        <div class="scene">
            <h1 class="slogan">SCANNING YOUR COOKIES...</h1>
            <div id="id-loader" style="font-size:24px; color:var(--gold);">[#######....]</div>
        </div>`,

    // 4. Холл
    hall: (user) => `
        <div class="scene">
            <div class="profile">
                ${user.avatar} ${user.flag} 
                <span style="border:1px solid var(--gold); padding:2px 5px;">#${user.numCode}</span>
            </div>
            <div class="slogan">YOU ARE NOW A LEGITIMATE GUEST</div>
            <div style="position:relative;">
                <button class="btn-gy" onclick="UI.toggle('proceed-menu')">PROCEED ↓</button>
                <div id="proceed-menu" class="drop-list">
                    <div class="drop-item" onclick="Agent.transit('bar')">To the Bar 🥃</div>
                </div>
            </div>
        </div>`,

    // Дальше — Бар и Столики по протоколу
    bar: `
        <div class="scene">
            <h2 class="slogan">"THE HORSE IS A BARTENDER TOO..."</h2>
            <img src="horse.png" class="horse-img">
            <button class="btn-gy" onclick="Agent.transit('tables')">LOOK AT TABLES</button>
        </div>`,

    tables: `
        <div class="scene">
            <h3 class="slogan">6 TABLES & A MICROPHONE 🎤</h3>
            <p>[Pouring Sounds 2.0 active]</p>
            <button class="btn-gy" onclick="Agent.transit('bar')">BACK TO THE HORSE</button>
        </div>`
};
