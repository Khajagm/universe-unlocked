export function getAssetUrl(path: string | undefined): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    
    const baseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    
    return baseUrl ? `${baseUrl}/${cleanPath}` : path;
  }