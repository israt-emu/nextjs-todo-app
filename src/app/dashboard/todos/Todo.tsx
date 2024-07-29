"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import {CalendarX, ChevronRight, Edit, FilePenLine, Trash2} from "lucide-react";
import {format} from "date-fns";
import {deleteTodo} from "@/app/actions/todo";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import TodoUpdateForm from "@/app/components/TodoUpdateForm";
import {TodoUpdateProps} from "@/app/types/props";

const FormSchema = z.object({
  completed: z.boolean().default(false).optional(),
});

export function SingleTodo({todo, categories, colors}: TodoUpdateProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      completed: false,
    },
  });

  const todoDelete = async () => {
    const result = await deleteTodo(todo.id);
    console.log(result);
    if (result.message) {
      toast({
        title: "Deleted todo successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  return (
    <Form {...form}>
      <form className="flex flex-row justify-between space-y-6 my-1 rounded-md shadow border" style={{background: todo?.color?.hexCode}}>
        <FormField
          control={form.control}
          name="completed"
          render={({field}) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4 w-full">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none text-sm capitalize">
                <div>{todo?.title}</div>

                {todo?.reminder && (
                  <div className="flex flex-row gap-1 items-center text-sm">
                    <CalendarX className="w-4" />
                    <p className="">{format(todo?.reminder, "dd/MM/yyyy")}</p>
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />
        <div className="mr-4 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2 className="cursor-pointer mr-3 text-red-400 w-5" onClick={todoDelete} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Sheet>
            <SheetTrigger asChild>
              <FilePenLine className="cursor-pointer w-5" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Todo</SheetTitle>
                <SheetDescription> Click save when you are done.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <TodoUpdateForm categories={categories} colors={colors} todo={todo} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </form>
    </Form>
  );
}
