export interface Certificate {
  i18nKey: string
  image?: string
  credentialUrl?: string
}

export const certificates: Certificate[] = [
  { i18nKey: "certificateItems.meta-frontend", 
    image: "/assets/certificates/react.png",
    credentialUrl: "https://coursera.org/share/326c7314fd89ef90bf4756581f4831fb"
  },
  { i18nKey: "certificateItems.angular", 
    image: "/assets/certificates/angular.png",
    credentialUrl: "https://coursera.org/share/979a2a69b6a052d113ec720b282bc744"
  },
]
