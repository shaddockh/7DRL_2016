echo copying dependencies...
# can't use the npm version of rot, need to use the web version with modifications to export
#cp node_modules/rot-js/lib/rot.js Resources/Modules
cp node_modules/pubsub-js/src/pubsub.js Resources/Modules/pubsub-js.js

echo compiling...
# need to create some d.ts files from the modules directory
tsc -d --out temp/app.js --module system Resources/Modules/*.ts Resources/Modules/**/*.ts typings/**/*.d.ts
rm -r temp/app.js

tsc
