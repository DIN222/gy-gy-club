const Scenes = {
    entrance: `
        <div class="scene" style="background-image: url('bg_door.jpg')">
            <div class="overlay">
                <img src="door.png" class="door-img" onclick="Agent.transit('welcome')">
                <p>CLICK TO ENTER... ГЫ-ГЫ!</p>
            </div>
        </div>`,
    welcome: `
        <div class="scene" style="background-image: url('bg_welcome.jpg')">
            <div class="overlay">
                <h1>WELCOME ZONE</h1>
                <button class="btn-gy" onclick="Agent.initIdentity()">IDENTIFY ME</button>
            </div>
        </div>`,
    generating: `
        <div class="scene" style="background-image: url('bg_id.jpg')">
            <div class="overlay"><h1>GENERATING ID...</h1></div>
        </div>`,
    hall: (u) => `
        <div class="scene" style="background-image: url('bg_hall.jpg')">
            <div class="overlay">
                <div>${u.flag} ${u.avatar} #${u.numCode}</div>
                <button class="btn-gy" onclick="UI.toggle('m')">PROCEED ↓</button>
                <div id="m" class="drop-list" style="position:static">
                    <div onclick="Agent.transit('bar')">To the Bar 🥃</div>
                </div>
            </div>
        </div>`,
    bar: `
        <div class="scene" style="background-image: url('bg_bar.jpg')">
            <div class="overlay">
                <h2>"THE HORSE IS A BARTENDER TOO..."</h2>
                <img src="horse.png" class="horse-img">
                <button class="btn-gy" onclick="Agent.transit('tables')">TABLES</button>
            </div>
        </div>`,
    tables: `
        <div class="scene" style="background-image: url('bg_tables.jpg')">
            <div class="overlay">
                <h3>6 TABLES & MIC 🎤</h3>
                <button class="btn-gy" onclick="Agent.transit('bar')">BACK</button>
            </div>
        </div>`
};
