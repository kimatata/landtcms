"use client";
import { useState, useEffect } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Home, Files, FlaskConical } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import useGetCurrentIds from "@/utils/useGetCurrentIds";

export default function Sidebar() {
  const { projectId } = useGetCurrentIds();
  const router = useRouter();
  const pathname = usePathname();

  const [currentKey, setCurrentTab] = useState("home");
  const baseClass = "p-3 rounded-none";
  const selectedClass = `${baseClass} bg-neutral-200 dark:bg-neutral-700 border-l-3 border-neutral-800`;

  const handleTabClick = (key: string) => {
    if (key === "home") {
      router.push(`/projects/${projectId}/home`);
    } else if (key === "cases") {
      router.push(`/projects/${projectId}/folders`);
    } else if (key === "runs") {
      router.push(`/projects/${projectId}/runs`);
    }
  };

  useEffect(() => {
    const handleRouteChange = (currentPath: string) => {
      if (currentPath.includes("home")) {
        setCurrentTab("home");
      } else if (currentPath.includes("folders")) {
        setCurrentTab("cases");
      } else if (currentPath.includes("runs")) {
        setCurrentTab("runs");
      }
    };

    handleRouteChange(pathname);
  }, [pathname]);

  const tabItems = [
    {
      key: "home",
      text: "Home",
      startContent: <Home strokeWidth={1} size={28} />,
    },
    {
      key: "cases",
      text: "Test Cases",
      startContent: <Files strokeWidth={1} size={28} />,
    },
    {
      key: "runs",
      text: "Test Runs",
      startContent: <FlaskConical strokeWidth={1} size={28} />,
    },
  ];

  return (
    <div className="w-64 border-r-1 dark:border-neutral-700">
      <Listbox
        aria-label="Listbox Variants"
        variant="light"
        className="p-0"
        onClick={() => router.push(`/projects/${projectId}/home`)}
      >
        {tabItems.map((itr, index) => (
          <ListboxItem
            key={itr.key}
            startContent={itr.startContent}
            onClick={() => handleTabClick(itr.key)}
            className={currentKey === itr.key ? selectedClass : baseClass}
          >
            {itr.text}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
