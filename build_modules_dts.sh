echo copying dependencies...
# can't use the npm version of rot, need to use the web version with modifications to export
#cp node_modules/rot-js/lib/rot.js Resources/Modules
cp node_modules/pubsub-js/src/pubsub.js Resources/Modules/pubsub-js.js

echo compiling...
# need to create ths Modules.d.ts from the modules directory so that components in the Components directory
# don't need to import in the fully specified path from the modules directory
tsc -d --out temp/Modules.js --module system Resources/Modules/*.ts Resources/Modules/**/*.ts typings/**/*.d.ts --target ES5
rm -r temp/Modules.js

cp temp/Modules.d.ts typings/7DRL_2016

tsc
