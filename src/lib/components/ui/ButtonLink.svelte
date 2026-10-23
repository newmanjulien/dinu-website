<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type ButtonLinkProps = Omit<HTMLAnchorAttributes, 'href' | 'children'> & {
    href: string;
    variant: 'primary' | 'secondary' | 'soft' | 'inverse' | 'inverse-outline';
    size: 'small' | 'medium' | 'large' | 'large-plus' | 'xlarge';
    shape?: 'pill' | 'soft-pill';
    fullWidth?: boolean;
    children: Snippet;
  };

  let {
    variant,
    size,
    shape = 'pill',
    fullWidth = false,
    children,
    class: className,
    ...anchorProps
  }: ButtonLinkProps = $props();

  const baseClasses =
    'inline-flex items-center justify-center font-book leading-none ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const sizeClasses = {
    small: 'h-[40px] px-[12px] text-[14px]',
    medium: 'h-[44px] px-[10px] text-[14px]',
    large: 'h-[48px] px-[17px] text-[16px]',
    'large-plus': 'h-[52px] px-[18px] text-[16px]',
    xlarge: 'h-[58px] px-[22px] text-[17px]'
  };
  const variantClasses = {
    primary: 'bg-ink text-white',
    secondary: 'border border-line bg-surface text-ink hover:border-line-mid hover:bg-canvas',
    soft: 'bg-canvas text-ink hover:bg-[#eaeaea]',
    inverse: 'bg-white text-brand-dark hover:bg-[#fff1f0]',
    'inverse-outline': 'border border-white/35 text-white hover:border-white/60 hover:bg-white/10'
  };
</script>

<a
  {...anchorProps}
  class={[
    baseClasses,
    shape === 'soft-pill'
      ? 'rounded-[20px] transition-[background-color,border-color,box-shadow,translate] duration-[180ms] motion-reduce:transition-none'
      : 'rounded-full transition-[color,background-color,border-color,box-shadow] duration-200',
    sizeClasses[size],
    variantClasses[variant],
    variant === 'inverse' || variant === 'inverse-outline' ? 'focus-visible:outline-white' : 'focus-visible:outline-black',
    variant !== 'primary' && 'hover:shadow-[0_2px_6px_rgba(32,33,36,0.08)]',
    fullWidth && 'w-full',
    className
  ]}
>
  {@render children()}
</a>
