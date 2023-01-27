// module + stuff
const fs = require("fs");
const path = require("path");
var log = ""; // Don't touch this


// config
let folder = "avl_anticheats"; // Put here your folder to scan
let lines = JSON.parse(fs.readFileSync("lines.json", "utf-8"));

log+="This script will scan all files/folders to find matches with what you put in lines.json, sometimes it can be a normal addon that uses these lines, but sometimes a backdoor.\nSo the script does not indicate ONLY the backdoors, but all the lines that match\n\n\n"

// main func
function main(dir, lines) {
    fs.readdirSync(dir).forEach(file => {
        const pathh = path.join(dir, file);
        const lstat = fs.lstatSync(pathh);

        if (lstat.isDirectory()) {
            main(pathh, lines);
        } else {
            const content = fs.readFileSync(pathh, "utf-8");
            const lignes = content.split("\n");

            lignes.forEach((line, el) => {
                lines.forEach(element => {
                    if (line.includes(element)) {
                        log+=`"${element}" found in: "${pathh}:${el + 1}\n`
                        console.log(`"${element}" found in: "${pathh}:${el + 1}`);
                    }
                });
            });

        }
    });
}
main(process.cwd()+`\\${folder}`, lines);

// just log
let nb = `log_${parseInt(new Date().getTime())}.txt`
fs.appendFile(nb, log, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("Log saved to "+ nb);
    }
});