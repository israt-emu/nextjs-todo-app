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
import Spinner from "@/components/ui/Spinner";
////
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  reminder: z.date().optional(),
  color: z.string().optional(),
});

const TodoAddForm = ({categories, colors, user}: TodoAddProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const formattedDate = values.reminder ? new Date(values.reminder).toISOString() : undefined;
    const todo = {
      title: values?.title,
      userId: user?.userId,
      colorId: Number(values?.color),
      reminder: formattedDate,
      categories: selectedCategories,
    };
    const addTodo = await createTodo(todo);
    setLoading(false);
    if (addTodo?.newTodo?.id) {
      toast({
        title: "Added todo successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
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
            <FormField
              control={form.control}
              name="reminder"
              render={({field}) => (
                <FormItem className="flex flex-col">
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
        </div>

        <Button type="submit" className="w-3/4">
          {loading && <Spinner color="border-white" />}
          Add Todo
        </Button>
      </form>
    </Form>
  );
};

export default TodoAddForm;
