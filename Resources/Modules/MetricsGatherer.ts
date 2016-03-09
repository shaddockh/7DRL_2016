
module MetricsGatherer {

    const statContainer = {};
    const metricsChain = [];

    export function start(name) {
        const statCounter = statContainer[name] || {
            count: 0,
            totalTime: 0
        };

        statCounter.count++;
        statCounter.startTime = new Date().getTime();
        statContainer[name] = statCounter;
        metricsChain.push(name);
    }

    export function stop(name) {
        const statCounter = statContainer[name];
        statCounter.stopTime = new Date().getTime();
        statCounter.totalTime += (statCounter.stopTime - statCounter.startTime);
        statCounter.avg = statCounter.totalTime / statCounter.count;
        metricsChain.pop();
    }

    export function dumpMetrics(name) {
        if (name) {
            const statCounter = statContainer[name];
            console.log(`STAT: ${name}  - called ${statCounter.count} times, total time: ${statCounter.totalTime} ms, avg: ${statCounter.avg} ms`);
        } else {
            for (let metric in statContainer) {
                dumpMetrics(metric);
            }
        }
    }

}

export default MetricsGatherer;
