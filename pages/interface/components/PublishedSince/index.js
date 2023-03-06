import { formatDistanceToNowStrict, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tooltip } from '@primer/react';
import { useEffect, useState } from 'react';

function formatPublishedSince(date) {
  const publishedSince = formatDistanceToNowStrict(new Date(date), {
    locale: ptBR,
  });

  return `${publishedSince} atrás`;
}

function formatTooltipLabel(date, gmt = false) {
  const displayFormat = gmt ? "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm z" : "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm";

  return format(new Date(date), displayFormat, { locale: ptBR });
}

export default function PublishedSince({ date, ...props }) {
  const [tooltipLabel, setTooltipLabel] = useState(formatTooltipLabel(date, true));

  useEffect(() => {
    setTooltipLabel(formatTooltipLabel(date));
  }, [date]);

  return (
    <Tooltip sx={{ position: 'absolute', ml: 1 }} aria-label={tooltipLabel} suppressHydrationWarning {...props}>
      <span style={{ whiteSpace: 'nowrap' }} suppressHydrationWarning>
        {formatPublishedSince(date)}
      </span>
    </Tooltip>
  );
}
