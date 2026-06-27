type DetailBlockProps = {
    label: string;
    value: any;
};

const DetailBlock = ({label, value} : DetailBlockProps) => {
  return (
    <div className='flex gap-2'>
        <p className='text-star-blue text-lg'>{label}:</p>
        <p className='text-star-green text-lg'>{value}</p>
    </div>
  )
}

export default DetailBlock;