import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 在每个测试后清理渲染的 DOM
afterEach(() => {
  cleanup();
});