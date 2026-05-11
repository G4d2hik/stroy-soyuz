import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дизайн-проектирование интерьеров | ООО Союз Строй",
  description:
    "Разработка индивидуальных дизайн-проектов квартир, домов и коммерческих пространств. 3D-визуализация, планировочные решения, авторский надзор.",
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
