// src/components/multi-select.tsx

import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {CheckIcon, XCircle, ChevronDown, XIcon, WandSparkles} from "lucide-react";

import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command";
import {Category} from "@/app/types/category";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva("m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  options: Category[];
  onValueChange: (value: number[]) => void;
  initialSelectedValue: number[];

  placeholder?: string;

  animation?: number;

  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(({options, onValueChange, variant, initialSelectedValue, placeholder = "Select options", animation = 0, maxCount = 4, modalPopover = false, asChild = false, className, ...props}, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<number[]>(initialSelectedValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (JSON.stringify(selectedValues) !== JSON.stringify(initialSelectedValue)) {
      setSelectedValues(selectedValues);
    }
  }, [initialSelectedValue, selectedValues]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true);
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.pop();
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    }
  };

  const toggleOption = (value: number) => {
    const newSelectedValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.id);
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button ref={ref} {...props} onClick={handleTogglePopover} className={cn("flex w-full p-1 rounded-md border border-primary min-h-10 h-auto bg-inherit hover:bg-inherit", className)}>
          {selectedValues.length > 0 ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-wrap items-center">
                {selectedValues.slice(0, maxCount)?.map((value) => {
                  const option = options.find((o) => o?.id === Number(value));
                  // const IconComponent = option?.icon;
                  return (
                    <Badge key={value} className={cn(isAnimating ? "animate-bounce" : "", multiSelectVariants({variant}))} style={{animationDuration: `${animation}s`}}>
                      {/* {IconComponent && <IconComponent className="h-4 w-4 mr-2" />} */}
                      {option?.name}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleOption(value);
                        }}
                      />
                    </Badge>
                  );
                })}
                {selectedValues.length > maxCount && (
                  <Badge className={cn("bg-transparent text-foreground border-foreground/1 hover:bg-transparent", isAnimating ? "animate-bounce" : "", multiSelectVariants({variant}))} style={{animationDuration: `${animation}s`}}>
                    {`+ ${selectedValues.length - maxCount} more`}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        clearExtraOptions();
                      }}
                    />
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <XIcon
                  className="h-4 mx-2 cursor-pointer text-muted-foreground"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClear();
                  }}
                />
                <Separator orientation="vertical" className="flex min-h-6 h-full" />
                <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mx-auto">
              <span className="text-sm text-muted-foreground mx-3">{placeholder}</span>
              <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
        <Command>
          <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary", selectedValues.length === options.length ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>(Select All)</span>
              </CommandItem>
              <CommandList>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option?.id);
                  return (
                    <CommandItem key={option?.id} onSelect={() => toggleOption(option?.id)} className="cursor-pointer">
                      <div className={cn("mr-2 hover:text-black flex h-4 w-4 items-center justify-center rounded-sm border border-primary", isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {/* {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />} */}
                      <span className={`hover:text-black ]`}>{option.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandList>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem onSelect={handleClear} className="flex-1 justify-center cursor-pointer">
                      Clear
                    </CommandItem>
                    <Separator orientation="vertical" className="flex min-h-6 h-full" />
                  </>
                )}
                <CommandSeparator />
                <CommandItem onSelect={() => setIsPopoverOpen(false)} className="flex-1 justify-center cursor-pointer">
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {animation > 0 && selectedValues.length > 0 && <WandSparkles className={cn("cursor-pointer my-2 text-foreground bg-background w-3 h-3", isAnimating ? "" : "text-muted-foreground")} onClick={() => setIsAnimating(!isAnimating)} />}
    </Popover>
  );
});

MultiSelect.displayName = "MultiSelect";
