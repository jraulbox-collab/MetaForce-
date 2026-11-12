// Prepara index.html (lo que se publica) a partir de fuente/index.html (lo que se edita).
// Traduce el JSX una sola vez y comprime, para que la app abra rápido sin Babel en el navegador.
const fs = require("fs");
const path = require("path");
const esbuild = require(process.env.ESBUILD_PATH || "/opt/npm-tools/node_modules/esbuild");
const raiz = path.join(__dirname, "..");
const fuente = fs.readFileSync(path.join(raiz, "fuente", "index.html"), "utf8");
const ABRE = '<script type="text/babel" data-presets="react">';
const i = fuente.indexOf(ABRE);
if (i < 0) throw new Error("No encontré el bloque text/babel en fuente/index.html");
const j = fuente.indexOf("</script>", i);
const codigo = fuente.slice(i + ABRE.length, j);
const r = esbuild.transformSync(codigo, { loader: "jsx", jsx: "transform", target: "es2020", minify: true, legalComments: "none" });
let salida = fuente.slice(0, i) + "<script>" + r.code.replace(/<\/script/gi, "<\\/script") + fuente.slice(j);
salida = salida.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/babel-standalone\/[^"]+"><\/script>\n?/, "");
const destino = process.argv[2] || "index.html"; // ej: node construir.js prueba/index.html
fs.mkdirSync(path.dirname(path.join(raiz, destino)), { recursive: true });
fs.writeFileSync(path.join(raiz, destino), salida);
console.log("OK", (fuente.length / 1024).toFixed(0) + " KB fuente →", (salida.length / 1024).toFixed(0) + " KB publicado");
