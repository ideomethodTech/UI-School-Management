// src/app/dashboard/results/layout.js
// This is a Server Component by default, so it can export metadata

export const metadata = {
  title: 'All Results - School Management',
  description: 'View and manage student results.',
};

export default function ResultsLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}