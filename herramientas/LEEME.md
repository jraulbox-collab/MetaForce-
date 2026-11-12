# Cómo se prepara MetaForce

- `fuente/index.html` = el archivo que se edita (con JSX).
- `node herramientas/construir.js` genera `index.html` = el archivo que se publica (JSX ya traducido y comprimido, sin Babel).
- `node herramientas/construir.js prueba/index.html` genera una copia de prueba en /prueba/.
- Respaldo de la versión anterior (con Babel): commit `1f425ea`.
