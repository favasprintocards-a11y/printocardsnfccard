export const generateVCard = (profile) => {
  const nameParts = profile.name.trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const firstName = nameParts[0] || '';

  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.name}`,
    profile.company ? `ORG:${profile.company}` : '',
    profile.role ? `TITLE:${profile.role}` : '',
    profile.phone ? `TEL;TYPE=CELL,VOICE:${profile.phone}` : '',
    profile.email ? `EMAIL;TYPE=INTERNET,WORK:${profile.email}` : '',
    profile.website ? `URL:${profile.website}` : '',
    profile.bio ? `NOTE:${profile.bio.replace(/\n/g, ' ')}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  return vcardLines;
};

export const downloadVCard = (profile) => {
  const vcardString = generateVCard(profile);
  const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.name.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
