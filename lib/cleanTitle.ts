function cleanTitle(title: string): string {
    return title
        .replace(/[-/#*\\[\]]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
export default cleanTitle

// // lib/cleanTitle.ts
// export default function cleanTitle(title: string | undefined | null): string {
//     if (!title) return '';
//     return title.replace(/\s+/g, '-').toLowerCase();
//   }
  