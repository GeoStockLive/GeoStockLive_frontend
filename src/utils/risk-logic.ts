/**
 * Standardized Risk Color Logic based on Modules PDF Page 82/114.
 */

export const RISK_THRESHOLDS = {
  HIGH: 0.7,
  MEDIUM: 0.4,
};

export const RISK_COLORS = {
  HIGH: '#ff3b3b',   // Red
  MEDIUM: '#ffc107', // Yellow
  LOW: '#4caf50',    // Green
};

/**
 * Returns the hex color code based on the risk score (0-1).
 */
export function getRiskColor(score: number): string {
  if (score >= RISK_THRESHOLDS.HIGH) return RISK_COLORS.HIGH;
  if (score >= RISK_THRESHOLDS.MEDIUM) return RISK_COLORS.MEDIUM;
  return RISK_COLORS.LOW;
}

/**
 * Returns the risk level name.
 */
export function getRiskLevel(score: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (score >= RISK_THRESHOLDS.HIGH) return 'HIGH';
  if (score >= RISK_THRESHOLDS.MEDIUM) return 'MEDIUM';
  return 'LOW';
}
