import { DestinationOption } from '~~/stores/AssetStore'

export const splitNodesByAvailibility = (
  nodes: DestinationOption[],
  availible: string[]
): [DestinationOption[], (DestinationOption & { disabled: boolean })[]] => {
  return nodes.reduce(
    (acc, val) => {
      if (availible.find((symbol) => val.label === symbol)) {
        acc[0].push(val)
        return acc
      }
      acc[1].push({ ...val, disabled: true })
      return acc
    },
    [[], []] as [
      DestinationOption[],
      (DestinationOption & { disabled: boolean })[]
    ]
  )
}
