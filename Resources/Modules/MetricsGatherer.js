"use strict";
var MetricsGatherer;
(function (MetricsGatherer) {
    var statContainer = {};
    var metricsChain = [];
    function start(name) {
        var statCounter = statContainer[name] || {
            count: 0,
            totalTime: 0
        };
        statCounter.count++;
        statCounter.startTime = new Date().getTime();
        statContainer[name] = statCounter;
        metricsChain.push(name);
    }
    MetricsGatherer.start = start;
    function stop(name) {
        var statCounter = statContainer[name];
        statCounter.stopTime = new Date().getTime();
        statCounter.totalTime += (statCounter.stopTime - statCounter.startTime);
        statCounter.avg = statCounter.totalTime / statCounter.count;
        metricsChain.pop();
    }
    MetricsGatherer.stop = stop;
    function dumpMetrics(name) {
        if (name) {
            var statCounter = statContainer[name];
            console.log("STAT: " + name + "  - called " + statCounter.count + " times, total time: " + statCounter.totalTime + " ms, avg: " + statCounter.avg + " ms");
        }
        else {
            for (var metric in statContainer) {
                dumpMetrics(metric);
            }
        }
    }
    MetricsGatherer.dumpMetrics = dumpMetrics;
})(MetricsGatherer || (MetricsGatherer = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MetricsGatherer;
