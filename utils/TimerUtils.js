import { v4 as uuid } from "uuid"

const convert = ms => power => Math.floor(ms / 1000 / Math.pow(60, power))

export const millisecondsToHuman = ms => {
  const convertMs = convert(ms)
  const seconds = convertMs(0) % 60
  const minutes = convertMs(1) % 60
  const hours = convertMs(2)

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(":")

  return humanized
}

const pad = (numberString, size) => {
  let padded = numberString
  while (padded.length < size) {
    padded = `0${padded}`
  }
  return padded
}

export const newTimer = (attrs = {}) => {
  const timer = {
    title: attrs.title || "Timer",
    project: attrs.project || "Project",
    id: uuid(),
    elapsed: 0,
    isRunning: false,
  }

  return timer
}
