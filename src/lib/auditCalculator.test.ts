import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadinessScore } from './auditCalculator.ts';
import { EMPTY_INTAKE_DATA, DEMO_SUBMISSIONS } from '../constants/initialData.ts';

test('Readiness score computes high score for ready e-commerce client', () => {
  const demoEcommerce = DEMO_SUBMISSIONS[0];
  const result = calculateReadinessScore(demoEcommerce, 'ar');
  
  assert.ok(result.overallScore >= 70, `Expected score >= 70, got ${result.overallScore}`);
  assert.equal(result.rating, 'exceptional');
  assert.ok(result.recommendedChannels.length > 0, 'Should recommend channels');
  assert.ok(result.suggestedDiscoveryQuestions.length >= 3, 'Should provide discovery questions');
});

test('Readiness score flags missing Conversions API and response time bottlenecks', () => {
  const incompleteData = {
    ...EMPTY_INTAKE_DATA,
    techConversionsAPI: 'no' as const,
    averageResponseTime: '24 hours+' as const,
    availableAssets: []
  };

  const result = calculateReadinessScore(incompleteData, 'ar');
  
  assert.ok(result.overallScore < 50, `Expected score < 50 for unprepared client, got ${result.overallScore}`);
  const hasCapiBlocker = result.blockers.some(b => b.includes('Conversions API'));
  assert.ok(hasCapiBlocker, 'Expected CAPI blocker to be identified');
});
