interface MiqraaLogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}
//logo 
export function MiqraaLogo({ size = 'medium', showTagline = false }: MiqraaLogoProps) {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-28 h-28',
    large: 'w-36 h-36'
  };

  const textSizes = {
    small: { title: 'text-xl', tagline: 'text-xs' },
    medium: { title: 'text-2xl', tagline: 'text-sm' },
    large: { title: 'text-3xl', tagline: 'text-base' }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${sizeClasses[size]} bg-emerald-600 rounded-full flex items-center justify-center`}
      >
        <span className="text-white text-2xl font-bold">م</span>
      </div>
      {showTagline && (
        <div className="text-center">
          <p className={`${textSizes[size].tagline} text-gray-600 italic mt-1`}>نورٌ يُتلى</p>
        </div>
      )}
    </div>
  );
}