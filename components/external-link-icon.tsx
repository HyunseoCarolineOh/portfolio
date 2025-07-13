import Image from "next/image"

export function ExternalLinkIcon({ className }: { className?: string }) {
  return <Image src="/images/link-out-icon.png" alt="External link" width={16} height={16} className={className} />
}
