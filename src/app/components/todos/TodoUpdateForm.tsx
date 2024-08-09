"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {areArraysEqual, cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";

import {MultiSelect} from "@/components/ui/multiselect";
import {Label} from "@/components/ui/label";
import Spinner from "@/components/ui/Spinner";
import {TodoUpdateProps} from "@/app/types/props";
import {updateTodo} from "@/app/actions/todo";
import {Color} from "@/app/types/color";
////
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  reminder: z.date().optional(),
  color: z.optional(z.string()),
});

const TodoUpdateForm = ({categories, colors, todo}: TodoUpdateProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(todo.categories ? todo.categories.map((cat) => cat.categoryId) : []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title,
      reminder: new Date(todo?.reminder!),
      color: todo?.colorId?.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formattedDate = values.reminder ? new Date(values.reminder).toISOString() : undefined;
    const oldcategories = todo?.categories?.map((cat) => cat.categoryId);
    const updateData = {
      data: {
        title: values?.title,
        colorId: Number(values?.color),
        reminder: formattedDate,
      },
      newCategories: areArraysEqual(selectedCategories, oldcategories) ? [] : selectedCategories,
    };
    const result = await updateTodo(todo.id, updateData);

    setLoading(false);
    if (result?.success) {
      toast({
        title: "Updated task successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Sorry! An error occured...",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col   content-center gap-4">
        <div className="">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <div className="">
                    <Label htmlFor="title" className="">
                      Title
                    </Label>
                    <Input id="title" placeholder="Enter the title of your task." {...field} className="border border-primary " />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <Label htmlFor="category" className="">
            Category
          </Label>
          <MultiSelect id="category" options={categories} onValueChange={setSelectedCategories} initialSelectedValue={selectedCategories} placeholder="Choose one or more categories for your task." variant="inverted" animation={2} maxCount={2} />
        </div>
        <div className="">
          <Label htmlFor="color" className="">
            Color
          </Label>
          <FormField
            name="color"
            control={form.control}
            render={({field}) => (
              <FormItem className="my-0">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="color" className="text-gray-600 ">
                      <SelectValue placeholder="Select Color" />
                    </SelectTrigger>
                    <SelectContent className="bg-background flex items-center justify-center">
                      {colors?.map((color: Color, i: number) => (
                        <SelectItem key={i} value={`${color.id}`}>
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full border border-gray-900 `} style={{backgroundColor: color.hexCode}}></div>
                            <p className="capitalize ml-2">{color.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="reminder"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Reminder</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn(" pl-3 text-left font-normal border border-primary", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <Button className="bg-transparent border border-primary text-dark">Cancel</Button>
          <Button type="submit" className="text-dark bg-transparent border border-secondary">
            {loading && <Spinner color="border-primary" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoUpdateForm;
