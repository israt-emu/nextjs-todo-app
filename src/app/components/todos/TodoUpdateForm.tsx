"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import {Calendar as CalendarIcon, Flag} from "lucide-react";
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

////
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  reminder: z.date().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["LOW", "HIGH", "MEDIUM"]),
});

const TodoUpdateForm = ({categories, todo}: TodoUpdateProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(todo.categories ? todo.categories.map((cat) => cat.categoryId) : []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title,
      reminder: new Date(todo?.reminder!),
      dueDate: new Date(todo?.dueDate as Date),
      priority: todo?.priority,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const oldcategories = todo?.categories?.map((cat) => cat.categoryId);
    const updateData = {
      data: {
        title: values?.title,
        reminder: values.reminder ? new Date(values.reminder).toISOString() : undefined,
        priority: values?.priority,
        dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
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
          <Label htmlFor="priority" className="">
            Priority
          </Label>
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
        <div className="w-full">
          <FormField
            control={form.control}
            name="dueDate"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
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

        <div className="grid grid-cols-2 gap-4 items-center">
          <Button className="bg-transparent btn-gradient1 dark:btn-gradient2 text-dark h-8">Cancel</Button>
          <Button type="submit" className="text-dark bg-transparent hover:bg-transparent border gradient1 dark:gradient2 rounded h-8">
            {loading && <Spinner color="border-white" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoUpdateForm;
