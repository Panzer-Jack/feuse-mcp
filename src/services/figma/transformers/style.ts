import type { Node as FigmaDocumentNode } from '@figma/rest-api-spec'
import type { SimplifiedFill } from '../simplify-node-response'
import { generateCSSShorthand, isVisible, parsePaint } from '@fastmcp/utils/common'
import { hasValue, isStrokeWeights } from '@fastmcp/utils/identity'

export interface SimplifiedStroke {
  colors: SimplifiedFill[]
  strokeWeight?: string
  strokeDashes?: number[]
  strokeWeights?: string
}

export function buildSimplifiedStrokes(n: FigmaDocumentNode): SimplifiedStroke {
  const strokes: SimplifiedStroke = { colors: [] }
  if (hasValue('strokes', n) && Array.isArray(n.strokes) && n.strokes.length) {
    strokes.colors = n.strokes.filter(isVisible).map(parsePaint)
  }

  if (hasValue('strokeWeight', n) && typeof n.strokeWeight === 'number' && n.strokeWeight > 0) {
    strokes.strokeWeight = `${n.strokeWeight}px`
  }

  if (hasValue('strokeDashes', n) && Array.isArray(n.strokeDashes) && n.strokeDashes.length) {
    strokes.strokeDashes = n.strokeDashes
  }

  if (hasValue('individualStrokeWeights', n, isStrokeWeights)) {
    strokes.strokeWeight = generateCSSShorthand(n.individualStrokeWeights)
  }

  return strokes
}
