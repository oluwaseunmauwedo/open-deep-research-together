export const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full pt-[60px]">
      <p
        title={title}
        className="w-full text-[32px] font-medium text-left text-[#101828] overflow-hidden"
      >
        {title}
      </p>
      <p className="w-full text-base font-light text-left text-[#6a7282]">
        {description}
      </p>
      <div className="w-full mt-2 mb-6 h-[1px] bg-[#e5e7eb]"></div>
    </div>
  );
};
