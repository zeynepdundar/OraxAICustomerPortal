import * as React from "react";

/* ------------------ Card Root ------------------ */
function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "bg-white border border-gray-200 rounded-xl " +
        className
      }
      {...props}
    />
  );
}

/* ------------------ Card Header ------------------ */
function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={"px-6 pt-6 " + className}
      {...props}
    />
  );
}

/* ------------------ Card Title ------------------ */
function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={
        "text-sm font-medium text-gray-900 " +
        className
      }
      {...props}
    />
  );
}

/* ------------------ Card Description ------------------ */
function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={
        "text-sm text-gray-500 mt-1 " +
        className
      }
      {...props}
    />
  );
}

/* ------------------ Card Content ------------------ */
function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={"px-6 py-4 " + className}
      {...props}
    />
  );
}

/* ------------------ Card Footer ------------------ */
function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "px-6 pb-6 pt-4 border-t border-gray-100 " +
        className
      }
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};