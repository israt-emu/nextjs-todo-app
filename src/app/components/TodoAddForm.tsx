"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createTodo} from "../actions/todo";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {TodoAddProps} from "../types/props";
import {Color} from "../types/color";
import {MultiSelect} from "@/components/ui/multiselect";
////
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  reminder: z.date().optional(),
  color: z.string().optional(),
});

const TodoAddForm = ({categories, colors, user}: TodoAddProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formattedDate = values.reminder ? new Date(values.reminder).toISOString() : undefined;
    const todo = {
      title: values?.title,
      userId: user?.userId,
      colorId: Number(values?.color),
      reminder: formattedDate,
      categories: selectedCategories,
    };
    const addTodo = await createTodo(todo);
    console.log(addTodo);
    if (addTodo?.newtodo?.id) {
      toast({
        title: "Added todo successfully!",
        description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"></pre>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center content-center gap-4">
        <div className="w-3/4 border border-primary rounded-md">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter the title of your task." {...field} className="border boprder-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-3/4">
          <MultiSelect options={categories} onValueChange={setSelectedCategories} initialSelectedValue={selectedCategories} placeholder="Choose one or more categories for your task." variant="inverted" animation={2} maxCount={4} />
        </div>
        <div className="w-3/4 grid grid-cols-2 gap-4">
          <div className="">
            <FormField
              name="color"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="text-gray-600">
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
          <div className="">
            <Controller
              control={form.control}
              name="reminder"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal border-primary", !date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a due date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date);
                            field.onChange(date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-3/4">
          Add Todo
        </Button>
      </form>
    </Form>
  );
};

export default TodoAddForm;
