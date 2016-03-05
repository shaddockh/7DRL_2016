echo copying dependencies...
cp node_modules/rot-js/lib/rot.js Resources/Modules
cp node_modules/pubsub-js/src/pubsub.js Resources/Modules/pubsub-js.js

echo compiling...
# need to create some d.ts files from the modules directory
tsc -d --outdir typings/7DRL_2016/t

#tsc
