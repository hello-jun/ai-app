import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../page';

// 模拟 next/image 组件
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    // 简化 Image 组件为普通的 img 标签
    // 处理 priority 属性，将其转换为字符串或移除
    const { priority, ...restProps } = props;
    const imgProps = { ...restProps };
    if (priority !== undefined) {
      // 将 priority 布尔值转换为字符串
      (imgProps as any).priority = priority.toString();
    }
    return <img {...imgProps} alt={props.alt || ''} />;
  },
}));

// 模拟 next/navigation 如果需要的话
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '',
}));

describe('首页组件', () => {
  it('应该正确渲染组件', () => {
    render(<Home />);
    
    // 检查组件是否渲染成功（没有抛出错误）
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('应该包含正确的标题文本', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', {
      name: /to get started, edit the page\.tsx file\./i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-3xl');
  });

  it('应该包含描述段落和链接', () => {
    render(<Home />);
    
    // 检查段落文本
    const paragraph = screen.getByText(/looking for a starting point or more instructions\?/i);
    expect(paragraph).toBeInTheDocument();
    
    // 检查 Templates 链接（注意：这些链接没有 target 和 rel 属性）
    const templatesLink = screen.getByRole('link', { name: /templates/i });
    expect(templatesLink).toBeInTheDocument();
    expect(templatesLink).toHaveAttribute('href', 'https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
    // Templates 链接没有 target="_blank" 属性
    expect(templatesLink).not.toHaveAttribute('target');
    expect(templatesLink).not.toHaveAttribute('rel');
    
    // 检查 Learning 链接（注意：这些链接没有 target 和 rel 属性）
    const learningLink = screen.getByRole('link', { name: /learning/i });
    expect(learningLink).toBeInTheDocument();
    expect(learningLink).toHaveAttribute('href', 'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
    // Learning 链接没有 target="_blank" 属性
    expect(learningLink).not.toHaveAttribute('target');
    expect(learningLink).not.toHaveAttribute('rel');
  });

  it('应该包含 Next.js 图片和 Vercel 图片', () => {
    render(<Home />);
    
    // 检查 Next.js 图片
    const nextImage = screen.getByAltText('Next.js logo');
    expect(nextImage).toBeInTheDocument();
    expect(nextImage).toHaveAttribute('src', '/next.svg');
    expect(nextImage).toHaveAttribute('width', '100');
    expect(nextImage).toHaveAttribute('height', '20');
    
    // 检查 Vercel 图片（在 Deploy Now 按钮中）
    const vercelImage = screen.getByAltText('Vercel logomark');
    expect(vercelImage).toBeInTheDocument();
    expect(vercelImage).toHaveAttribute('src', '/vercel.svg');
    expect(vercelImage).toHaveAttribute('width', '16');
    expect(vercelImage).toHaveAttribute('height', '16');
  });

  it('应该包含操作按钮链接', () => {
    render(<Home />);
    
    // 检查 Deploy Now 按钮
    const deployButton = screen.getByRole('link', { name: /deploy now/i });
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveAttribute('href', 'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
    expect(deployButton).toHaveAttribute('target', '_blank');
    expect(deployButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(deployButton).toHaveClass('bg-foreground');
    
    // 检查 Documentation 按钮
    const docsButton = screen.getByRole('link', { name: /documentation/i });
    expect(docsButton).toBeInTheDocument();
    expect(docsButton).toHaveAttribute('href', 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
    expect(docsButton).toHaveAttribute('target', '_blank');
    expect(docsButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(docsButton).toHaveClass('border');
  });

  it('应该包含暗黑模式相关的类名', () => {
    render(<Home />);
    
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('dark:bg-black');
    
    const heading = screen.getByRole('heading', {
      name: /to get started, edit the page\.tsx file\./i,
    });
    expect(heading).toHaveClass('dark:text-zinc-50');
    
    const paragraph = screen.getByText(/looking for a starting point or more instructions\?/i);
    expect(paragraph).toHaveClass('dark:text-zinc-400');
    
    // 检查图片是否有 dark:invert 类
    const nextImage = screen.getByAltText('Next.js logo');
    expect(nextImage).toHaveClass('dark:invert');
    
    const vercelImage = screen.getByAltText('Vercel logomark');
    expect(vercelImage).toHaveClass('dark:invert');
  });

  it('应该包含响应式设计的类名', () => {
    render(<Home />);
    
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('sm:items-start');
    
    const contentContainer = mainContainer.querySelector('div.flex.flex-col');
    expect(contentContainer).toHaveClass('sm:items-start', 'sm:text-left');
    
    const buttonContainer = screen.getByText(/deploy now/i).closest('div');
    expect(buttonContainer).toHaveClass('sm:flex-row');
  });
});