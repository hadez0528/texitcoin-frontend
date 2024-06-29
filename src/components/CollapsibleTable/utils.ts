// ----------------------------------------------------------------------

export default function createData(
  id: string,
  issuedAt: string,
  totalBlocks: number,
  newBlocks: number,
  totalHashPower: number,
  totalMembers: number,
  from: string,
  to: string,
  status: boolean
) {
  return {
    id,
    issuedAt,
    totalBlocks,
    newBlocks,
    totalHashPower,
    totalMembers,
    from,
    to,
    status,
  };
}
