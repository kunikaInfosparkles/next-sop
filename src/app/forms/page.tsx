"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  FormTextInput,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormAutocomplete,
} from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { successMsg } from "@/services/customFn";

export default function DemoForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      agree: false,
      gender: "",
      city: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("FORM DATA", data);
    successMsg('Form submitted')
    form.reset()
  }

  return (
    <div className="container py-5">
      <Card className="w-full max-w-lg m-auto">
        <CardHeader>
          <CardTitle>Form</CardTitle>
          <CardDescription>
            take reference of forms and input fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormTextInput
                    control={form.control}
                    name="name"
                    label="Product Name"
                    placeholder="Enter product"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <FormSelect
                    control={form.control}
                    name="category"
                    label="Category"
                    options={[
                      { label: "Electronics", value: "electronics" },
                      { label: "Fashion", value: "fashion" },
                    ]}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <FormCheckbox
                    control={form.control}
                    name="agree"
                    label="Agree to terms"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <FormRadioGroup
                    control={form.control}
                    name="gender"
                    label="Gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <FormAutocomplete
                    control={form.control}
                    name="city"
                    label="City"
                    options={[
                      { label: "Mumbai", value: "mumbai" },
                      { label: "Delhi", value: "delhi" },
                      { label: "Bangalore", value: "bangalore" },
                    ]}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  );
}


