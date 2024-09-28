"use client";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Color} from "@/app/types/color";
import Spinner from "@/components/ui/Spinner";
import {Button} from "@/components/ui/button";
import {createCategory} from "@/app/actions/category";
import {Category} from "@/app/types/category";
import {User} from "@/app/types/user";
//
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});
const AddCategoryForm = ({user, handleClose}: {user: User; handleClose: () => void}) => {
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = await createCategory({name: values?.title, userId: user?.userId} as Category);
    setLoading(false);
    console.log(result);
    if (result?.success) {
      toast({
        title: "Added Category successfully!",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-11/12 md:w-10/12 mx-auto flex flex-col justify-center items-center content-center gap-4">
        <div className="w-full border border-primary rounded-md">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter the title.." {...field} className="border boprder-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full h-9">
          {loading && <Spinner color="border-white" />}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
