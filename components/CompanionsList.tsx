import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
}: CompanionListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="text-xl sm:text-3xl font-semibold max-[400px]:text-lg">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-lg w-2/3 max-[400px]:text-[11px]">Lessons</TableHead>
            <TableHead className="text-xs sm:text-lg max-[400px]:text-[11px]">Subject</TableHead>
            <TableHead className="text-xs sm:text-lg text-right max-[400px]:text-[11px]">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map((companion,idx:number) => (
            <TableRow key={idx}>
              <TableCell>
                <Link href={`/companions/${companion.id}`}  className="no-underline! hover:no-underline active:no-underline">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-18 flex items-center justify-center rounded-lg max-md:hidden"
                      style={{
                        backgroundColor: getSubjectColor(companion.subject),
                      }}
                    >
                      <Image
                        src={`/icons/${companion.subject}.svg`}
                        alt={companion.subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <p className="font-bold text-base sm:text-2xl max-[400px]:text-sm">{companion.name}</p>
                      <p className="text-xs sm:text-lg max-[400px]:text-[11px]">{companion.topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {companion.subject}
                </div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{
                    backgroundColor: getSubjectColor(companion.subject),
                  }}
                >
                    <Image
                        src={`/icons/${companion.subject}.svg`}
                        alt={companion.subject}
                        width={18}
                        height={18}
                      />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-full justify-end">
                    <span className="max-md:hidden">{companion.duration} mins</span>
                    <span className="md:hidden">{companion.duration}m</span>
                    <Image src={`/icons/clock.svg`} alt="minutes" className="md:hidden" width={14} height={14} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
