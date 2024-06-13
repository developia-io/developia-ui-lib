import { useCallback, useState } from 'react';

export default function useModal(): {
  open: boolean;
  onToggle: () => void;
} {
  const [open, setOpen] = useState<boolean>(false);

  const onToggle = useCallback(() => setOpen((prev) => !prev), []);

  return {
    open,
    onToggle,
  };
}
