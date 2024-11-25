export const getSilos = async () => {
  const res = await fetch('/api/silos');
  return res.json();
};

export const postMovimentacao = async (data: any) => {
  const res = await fetch('/api/silos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
