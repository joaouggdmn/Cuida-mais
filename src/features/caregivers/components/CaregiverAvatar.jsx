const SIZES = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-14 w-14 text-lg',
}

export function CaregiverAvatar({ caregiver, size = 'md' }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${SIZES[size]} ${caregiver.color}`}
    >
      {caregiver.initials}
    </span>
  )
}
