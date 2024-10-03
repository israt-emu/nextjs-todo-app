"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import {Calendar as CalendarIcon, Flag} from "lucide-react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {MultiSelect} from "@/components/ui/multiselect";
import Spinner from "@/components/ui/Spinner";
import {TodoAddProps} from "@/app/types/props";
import {createTodo} from "@/app/actions/todo";

////
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  reminder: z.date().optional(),
  priority: z.enum(["LOW", "HIGH", "MEDIUM"]),
  dueDate: z.date().optional(),
});

const TodoAddForm = ({categories, user, handleClose}: TodoAddProps) => {
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

    const todo = {
      title: values?.title,
      userId: user?.userId,
      reminder: values.reminder ? new Date(values.reminder).toISOString() : undefined,
      priority: values?.priority,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      categories: selectedCategories,
    };
    const result = await createTodo(todo);
    setLoading(false);
    if (result?.success) {
      toast({
        title: "Added task successfully!",
      });
      handleClose();
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="w-full">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter the title of your task." {...field} className="border border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <MultiSelect options={categories} onValueChange={setSelectedCategories} initialSelectedValue={selectedCategories} placeholder="Choose one or more categories" variant="inverted" animation={2} maxCount={4} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <FormField
              name="priority"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="text-gray-600">
                        <SelectValue placeholder="Set Priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-background flex items-center justify-center">
                        <SelectItem value="LOW">
                          <div className="flex items-center">
                            <Flag className="text-green-600 w-5 mr-2" />
                            <span>Low</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <div className="flex items-center">
                            <Flag className="text-yellow-600 w-5 mr-2" />
                            <span>Medium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="HIGH">
                          <div className="flex items-center">
                            <Flag className="text-red-600 w-5 mr-2" />
                            <span>High</span>
                          </div>
                        </SelectItem>
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
              name="dueDate"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn(" pl-3 text-left font-normal border border-primary dark:hover:bg-transparent", !field.value && "text-muted-foreground h-10")}>
                          {field.value ? format(field.value, "PPP") : <span>Due date</span>}
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
        <div className="w-full">
          <div className="">
            <FormField
              control={form.control}
              name="reminder"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn(" pl-3 text-left font-normal border border-primary dark:hover:bg-transparent", !field.value && "text-muted-foreground h-10")}>
                          {field.value ? format(field.value, "PPP") : <span>Set Reminder</span>}
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

        <Button type="submit" className="w-full h-10">
          {loading && <Spinner color="border-white" />}
          Add Todo
        </Button>
      </form>
    </Form>
  );
};

export default TodoAddForm;
