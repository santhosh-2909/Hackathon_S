import type { Metadata } from 'next';
import { PhotoGallery } from '@/features/gallery/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse photos from the KIRA 2026 event journey.',
};

export default function GalleryPage() {
  return <PhotoGallery />;
}
