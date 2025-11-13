// src/components/Avatar.js
// A simple reusable Avatar component
export default function Avatar({ src, name, size = 'medium' }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('') : '';
  const avatarSize = size === 'small' ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold ${avatarSize}`}
    >
      {src ? (
        <img src={src} alt={name} className="absolute inset-0 w-full h-full rounded-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}