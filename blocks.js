const Scenes = {
    entrance: `
        <div class="scene">
            <img src="door_closed.jpg" class="door-img" onclick="Agent.initEntry()">
        </div>`,

    welcome: `
        <div class="scene">
            <div class="slogan" style="font-style:italic;">GENESYS IN PROGRESS...</div>
            <div class="loader" style="width:100px; height:1px; background:var(--gold);"></div>
        </div>`,

    hall: (user) => `
        <div class="scene">
            <div class="user-profile">
                <span>${user.flag}</span> <span>${user.avatar}</span> 
                <span style="border:1px solid var(--gold); padding:2px 5px;">#${user.numCode}</span>
            </div>
            <div style="position:relative; margin-top:20px;">
                <button class="btn-gy" onclick="UI.toggle('go-menu')">PROCEED ↓</button>
                <div id="go-menu" class="drop-list" style="position:static; display:none;">
                    <div class="drop-item" onclick="Agent.transit('bar')">TO THE BAR 🥃</div>
                </div>
            </div>
        </div>`,

    bar: `
        <div class="scene">
            <div class="slogan">"THE HORSE IS A BARTENDER TOO..."</div>
            <img src="horse_bartender.png" class="horse-img">
            <div style="display:flex; gap:10px;">
                <button class="btn-gy" onclick="Agent.transit('tables')">TABLES</button>
                <button class="btn-gy" onclick="Agent.transit('server')">AI ROOM</button>
            </div>
        </div>`
};
