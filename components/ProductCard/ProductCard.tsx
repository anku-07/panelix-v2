import { IProductCardProps } from "@/typescript/interfaces/CustomAllInterface";
import Button from "@/ui/Button/Button";
import Image from "next/image";
import React from "react";

const ProductCard = ({
  title,
  description,
  price,
  category,
  imageUrl,
  onAddtoCart,
  badgeText,
  isInCart,
}: IProductCardProps) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-[--radius] border border-border bg-card p-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground italic">
          {/* Replace with <img /> tag */}
          <Image
            src={imageUrl || "/fallback.png"}
            alt="Product Image"
            width={200}
            height={200}
          />
        </div>
        {/* Accent Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm">
          {badgeText || "New"}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          {/* <Tag size={14} className="text-primary" /> */}
          <span className="text-xs font-medium uppercase tracking-wider">
            {category}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="line-clamp-2 font-body text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-heading text-2xl font-bold text-foreground">
            ${price}
          </span>
          <Button
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onAddtoCart?.()}
          >
            {/* <ShoppingCart size={18} /> */}
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
