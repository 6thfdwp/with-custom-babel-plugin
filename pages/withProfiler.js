import { Profiler } from 'react'

/** 
 * {
 *   "StoryList": {mount: [time1], update: [time1, time2]},
 *   "StoryLike": {mount: [time1], update: [time1, time2]}
 * }
*/

const ConsoleProfiler= (() => {
  const metrics = {}
  let tid = null
  const self = {
    record: (compId, phase, actualTime) => { 
      if (!metrics[compId]) metrics[compId] = {mount: [], update: []}
      metrics[compId][phase].push(actualTime)

      if (tid) clearTimeout(tid)
      tid = setTimeout(() => {
        self.print()
      }, 60)
    },
  
    clear: () => {
      for (const k in metrics) {
        metrics[k].update = []
      }
    },

    print: () => {
      const tables = {}
      const sumTime = arr => arr.reduce((pre, cur) => pre + cur, 0)
      const formatTime = t => `${Math.round(t*100) / 100}ms`

      for (const k in metrics) {
        const mounts = metrics[k].mount
        const updates = metrics[k].update
        const accTime = sumTime(updates)
        tables[k] = {
          "mount": `${mounts.length} [${formatTime(sumTime(mounts))}]`,
          "re-renders": updates.length, 
          "total re-render time": formatTime(accTime), 
          // "avg time": updates.length>0 ? formatTime(accTime/updates.length) : 0
        }
      }
      console.table(tables)
      // clear update
      self.clear()
    }
  }

  console.log("## withProfiler init...")
  return self
})()

export default function withProfiler(id, Comp) {
  return (props) => (
    <Profiler id={id} onRender={(compId, phase, actualTime) => {
      ConsoleProfiler.record(compId, phase, actualTime)
    }}>
      <Comp {...props} />
    </Profiler>
  )
}